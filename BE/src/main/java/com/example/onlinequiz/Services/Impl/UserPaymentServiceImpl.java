package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Config.VNPayConfig;
import com.example.onlinequiz.Model.SubjectPrice;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.CourseCheckoutResponse;
import com.example.onlinequiz.Payload.Response.PaymentResponse;
import com.example.onlinequiz.Repo.SubjectPriceRepository;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Repo.UserPaymentRepository;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.UserPaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserPaymentServiceImpl implements UserPaymentService {

    @Autowired
    private final UserPaymentRepository userPaymentRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

    @Autowired
    private final SubjectPriceRepository subjectPriceRepository;

    @Autowired
    private final UserRepository userRepository;

    @Override
    public boolean checkPay(Subjects s, Users u) {

        return userPaymentRepository.existsBySubjectAndUsers(s, u);
    }


    @Override
    public List<Long> countPaymentsByMonthsInYear(int year) {
        List<Long> monthlyCounts = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, year);
            calendar.set(Calendar.MONTH, i - 1);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date startOfMonth = calendar.getTime();

            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date endOfMonth = calendar.getTime();

            long count = userPaymentRepository.countPaymentsInMonth(startOfMonth, endOfMonth);
            monthlyCounts.add(count);
        }
        return monthlyCounts;
    }

    @Override
    public CourseCheckoutResponse getCourseCheckout(Long subjectId) {

        try {
            Subjects subject = subjectRepository.getSubjectsBySubjectID(subjectId);

            SubjectPrice subjectPrice = subjectPriceRepository.findBySubjectAndAndStatus(subject, true);

            CourseCheckoutResponse response = new CourseCheckoutResponse(
                    subjectId,
                    subject.getSubjectName(),
                    subject.getImage(),
                    subjectPrice.getPreID(),
                    subjectPrice.getPrice()
            );

            return response;
        } catch (Exception e) {
            System.out.println("getCourseCheckout - UserPaymentService: " + e.getMessage());
            return null;
        }

    }

    @Override
    public UserPayment addNewPayment(Long userId, Long subjectId, Long preId) {
        Users u = userRepository.getById(userId);

        Subjects s = subjectRepository.getSubjectsBySubjectID(subjectId);

        SubjectPrice subjectPrice = subjectPriceRepository.findBySubjectAndAndStatus(s, true);


        UserPayment userPayment = new UserPayment();
        userPayment.setUsers(u);
        userPayment.setStatus(false);
        userPayment.setSubjectPrice(subjectPrice);
        userPayment.setSubject(s);
        userPayment.setPurchaseDate(new Date());
        userPayment.setNotify("pending");

        userPaymentRepository.save(userPayment);
        return userPayment;
    }

    // Endpoint tạo thanh toán
    @Override
    public PaymentResponse createNewVnPayPayment(Long price, Long billId) throws UnsupportedEncodingException {
        // Tính toán tổng số tiền thanh toán (amount tính theo đơn vị đồng)
        long amount = price * 100;
        String vnp_TxnRef = String.valueOf(billId);
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String vnp_Return = VNPayConfig.vnp_ReturnUrl;

        // Tạo danh sách các tham số cần thiết cho yêu cầu thanh toán
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "OrderInfo" + vnp_TxnRef);
        vnp_Params.put("vnp_ReturnUrl", vnp_Return);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");

        // Tạo ngày tạo giao dịch và ngày hết hạn giao dịch
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Sắp xếp các tham số theo thứ tự và xây dựng chuỗi dữ liệu băm
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                // Xây dựng chuỗi dữ liệu băm
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                // Xây dựng chuỗi query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        // Tạo URL thanh toán bằng cách thêm mã hash bảo mật
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;

        // Tạo đối tượng PaymentResponse để trả về thông tin thanh toán
        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setStatus("0k");
        paymentResponse.setMessage("success");
        paymentResponse.setURL(paymentUrl);
        return paymentResponse;
    }

    @Override
    public Boolean updatePayment(Long billId) {
        try{
            System.out.println(billId);
            UserPayment userPayment = userPaymentRepository.findUserPaymentByBillID(billId);
            userPayment.setStatus(true);
            userPaymentRepository.save(userPayment);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public List<Long> calculatePriceByMonthsInYear(int year) {
        List<Long> monthlyPrices = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, year);
            calendar.set(Calendar.MONTH, i - 1);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date startOfMonth = calendar.getTime();

            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date endOfMonth = calendar.getTime();

            Long price = userPaymentRepository.calculatePriceInMonth(startOfMonth, endOfMonth);
            monthlyPrices.add(price != null ? price : 0L);
        }
        return monthlyPrices;
    }




}
