package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Config.VNPayConfig;
import com.example.onlinequiz.Payload.Response.PaymentResponse;
import com.example.onlinequiz.Payload.Response.TransactionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    // Endpoint tạo thanh toán
    @GetMapping("/create_payment")
    public ResponseEntity<?> createPayment(@RequestParam long price) throws UnsupportedEncodingException {

        // Tính toán tổng số tiền thanh toán (amount tính theo đơn vị đồng)
        long amount = price * 100;
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        // Tạo danh sách các tham số cần thiết cho yêu cầu thanh toán
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_ReturnUrl", "http://localhost:8080/api/payment/payment_infor");
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
        return ResponseEntity.status(HttpStatus.OK).body(paymentResponse);
    }

    // Endpoint xử lý thông tin giao dịch sau khi thanh toán
    @GetMapping("/payment_infor")
    public ResponseEntity<?> transaction(
            @RequestParam(value = "vnp_Amount", required = false) String amount,
            @RequestParam(value = "vnp_BankCode", required = false) String bankCode,
            @RequestParam(value = "vnp_OrderInfo", required = false) String order,
            @RequestParam(value = "vnp_ResponseCode", required = false) String responseCode
    ){
        // Tạo đối tượng TransactionResponse để trả về kết quả giao dịch
        TransactionResponse transactionResponse = new TransactionResponse();
        if(responseCode.equals("00")){
            transactionResponse.setData("");
            transactionResponse.setStatus("OK");
            transactionResponse.setMessage("Successfull");
        } else {
            transactionResponse.setData("");
            transactionResponse.setStatus("OKn't");
            transactionResponse.setMessage("UnSuccessfull");
        }
        return ResponseEntity.ok(transactionResponse);
    }
}
/*
http://localhost:8080/api/payment/payment_infor?
vnp_Amount=1000000&
vnp_BankCode=NCB&
vnp_BankTranNo=VNP14136862&
vnp_CardType=ATM&
vnp_OrderInfo=Thanh+toan+don+hang%3A79865267&
vnp_PayDate=20231009165726&
vnp_ResponseCode=00&
vnp_TmnCode=QJZS3R8U&vnp_TransactionNo=14136862&
vnp_TransactionStatus=00&vnp_TxnRef=79865267&
vnp_SecureHash=c24637967a30ef03d71e095e31e4d111fb2dc504e1cbff6e8c812196f117dd18899b871cb40dfbe5006672b2aa1700cde35d34d33276d707f27c057fafb6f0b2
 */