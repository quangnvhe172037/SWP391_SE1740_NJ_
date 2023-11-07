package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Config.VNPayConfig;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Payload.Response.CourseCheckoutResponse;
import com.example.onlinequiz.Payload.Response.PaymentResponse;
import com.example.onlinequiz.Payload.Response.TransactionResponse;
import com.example.onlinequiz.Services.UserPaymentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private final UserPaymentService userPaymentService;


     // Endpoint xử lý thông tin giao dịch sau khi thanh toán
    @GetMapping("/check/return")
    public ResponseEntity<?> transaction(
            @RequestParam(value = "vnp_Amount", required = false) String amount,
            @RequestParam(value = "vnp_BankCode", required = false) String bankCode,
            @RequestParam(value = "vnp_BankTranNo",  required = false) String bankTranNo,
            @RequestParam(value = "vnp_CardType" , required = false) String cardType,
            @RequestParam(value = "vnp_OrderInfo", required = false) String orderInfo,
            @RequestParam(value = "vnp_PayDate", required = false) String payDate,
            @RequestParam(value = "vnp_ResponseCode", required = false) String responseCode,
            @RequestParam(value = "vnp_TmnCode", required = false) String tmnCode,
            @RequestParam(value = "vnp_TransactionNo", required = false) String transactionNo,
            @RequestParam(value = "vnp_TransactionStatus", required = false) String transactionStatus,
            @RequestParam(value = "vnp_TxnRef", required = false) String txnRef,
            @RequestParam(value = "vnp_SecureHash", required = false) String secureHash

    ) throws UnsupportedEncodingException {

        // CHia lại giá tiền
        int price = Integer.parseInt(amount);

        System.out.println(URLDecoder.decode(orderInfo, StandardCharsets.US_ASCII.toString()));
        // Check sum
        Map fields = new HashMap();
        fields.put("vnp_Amount" , amount);
        fields.put("vnp_BankCode" , bankCode);
        fields.put("vnp_BankTranNo" , bankTranNo);
        fields.put("vnp_CardType" , cardType);
        fields.put("vnp_OrderInfo" , "OrderInfo");
        fields.put("vnp_PayDate" , payDate);
        fields.put("vnp_ResponseCode" , responseCode);
        fields.put("vnp_TmnCode" , tmnCode);
        fields.put("vnp_TransactionNo" , transactionNo);
        fields.put("vnp_TransactionStatus" , transactionStatus);
        fields.put("vnp_TxnRef" , txnRef);
        fields.put("vnp_SecureHash" , secureHash);

        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields);
        System.out.println(signValue);

        // Tạo đối tượng TransactionResponse để trả về kết quả giao dịch

        TransactionResponse transactionResponse = new TransactionResponse();
        if (signValue.equals(secureHash)) {
            if (responseCode.equals("00")) {

                transactionResponse.setPrice(price / 100);
                transactionResponse.setData("You have successfully paid with the payment amount (VND): ");
                transactionResponse.setMessage("The transaction was performed successfully. Thank you for using the service.");
            } else {
                transactionResponse.setPrice(price / 100);
                transactionResponse.setData("You have unsuccessfully paid with the payment amount (VND): ");
                transactionResponse.setMessage("Transaction failed. Contact 0334745645 / quangnvhe172037@fpt.edu.vn for support.");
            }
        }else{
            transactionResponse.setPrice(price / 100);
            transactionResponse.setData("You have unsuccessfully paid with the payment amount (VND): ");
            transactionResponse.setMessage("Invalid signature. Contact 0334745645 / quangnvhe172037@fpt.edu.vn for support.");
        }
        return ResponseEntity.ok(transactionResponse);
    }


    @GetMapping("/check")
    public ResponseEntity<?> transactionIPN(
            @RequestParam(value = "vnp_Amount", required = false) String amount,
            @RequestParam(value = "vnp_BankCode", required = false) String bankCode,
            @RequestParam(value = "vnp_BankTranNo",  required = false) String bankTranNo,
            @RequestParam(value = "vnp_CardType" , required = false) String cardType,
            @RequestParam(value = "vnp_OrderInfo", required = false) String orderInfo,
            @RequestParam(value = "vnp_PayDate", required = false) String payDate,
            @RequestParam(value = "vnp_ResponseCode", required = false) String responseCode,
            @RequestParam(value = "vnp_TmnCode", required = false) String tmnCode,
            @RequestParam(value = "vnp_TransactionNo", required = false) String transactionNo,
            @RequestParam(value = "vnp_TransactionStatus", required = false) String transactionStatus,
            @RequestParam(value = "vnp_TxnRef", required = false) String txnRef,
            @RequestParam(value = "vnp_SecureHash", required = false) String secureHash

    ) throws UnsupportedEncodingException {

        // CHia lại giá tiền
        int price = Integer.parseInt(amount);

        System.out.println(URLDecoder.decode(orderInfo, StandardCharsets.US_ASCII.toString()));
        // Check sum
        Map fields = new HashMap();
        fields.put("vnp_Amount" , amount);
        fields.put("vnp_BankCode" , bankCode);
        fields.put("vnp_BankTranNo" , bankTranNo);
        fields.put("vnp_CardType" , cardType);
        fields.put("vnp_OrderInfo" , "OrderInfo");
        fields.put("vnp_PayDate" , payDate);
        fields.put("vnp_ResponseCode" , responseCode);
        fields.put("vnp_TmnCode" , tmnCode);
        fields.put("vnp_TransactionNo" , transactionNo);
        fields.put("vnp_TransactionStatus" , transactionStatus);
        fields.put("vnp_TxnRef" , txnRef);
        fields.put("vnp_SecureHash" , secureHash);

        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields);

        // Tạo đối tượng TransactionResponse để trả về kết quả giao dịch

        TransactionResponse transactionResponse = new TransactionResponse();
        if (signValue.equals(secureHash)) {
            if (responseCode.equals("00")) {
                Long billId = Long.parseLong(txnRef);
                if(userPaymentService.updatePayment(billId)){

                }
                transactionResponse.setPrice(price / 100);
                transactionResponse.setData("You have successfully paid with the payment amount (VND): ");
                transactionResponse.setMessage("The transaction was performed successfully. Thank you for using the service.");
            } else {
                transactionResponse.setPrice(price / 100);
                transactionResponse.setData("You have unsuccessfully paid with the payment amount (VND): ");
                transactionResponse.setMessage("Transaction failed. Contact 0334745645 / quangnvhe172037@fpt.edu.vn for support.");
            }
        }else{
            transactionResponse.setPrice(price / 100);
            transactionResponse.setData("You have unsuccessfully paid with the payment amount (VND): ");
            transactionResponse.setMessage("Invalid signature. Contact 0334745645 / quangnvhe172037@fpt.edu.vn for support.");
        }
        return ResponseEntity.ok(transactionResponse);
    }

    @GetMapping("/get/price/{subjectId}")
    public ResponseEntity<CourseCheckoutResponse> getPriceSubject(
            @PathVariable Long subjectId

    ) {
        try {
            CourseCheckoutResponse response = userPaymentService.getCourseCheckout(subjectId);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add/transaction/{subjectId}")
    public ResponseEntity<PaymentResponse> addNewPaymentTransaction(
            @PathVariable Long subjectId,
            @RequestParam Long userId,
            @RequestParam Long preId


    ) {
        try {
            UserPayment u = userPaymentService.addNewPayment(userId, subjectId, preId);
            PaymentResponse paymentResponse = userPaymentService.createNewVnPayPayment(u.getSubjectPrice().getPrice(), u.getBillID());


            if (paymentResponse != null) {
                return ResponseEntity.status(HttpStatus.OK).body(paymentResponse);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
/*
http://localhost:8080/api/payment/payment_infor?
vnp_Amount=1000000&
vnp_BankCode=NCB&
vnp_BankTranNo=VNP14136862&
vnp_CardType=ATM&
vnp_OrderInfo=Thanh+toan+don+hang%3A79865267&
Thanh toan
vnp_PayDate=20231009165726&
vnp_ResponseCode=00&
vnp_TmnCode=QJZS3R8U&vnp_TransactionNo=14136862&
vnp_TransactionStatus=00&vnp_TxnRef=79865267&
vnp_SecureHash=c24637967a30ef03d71e095e31e4d111fb2dc504e1cbff6e8c812196f117dd18899b871cb40dfbe5006672b2aa1700cde35d34d33276d707f27c057fafb6f0b2
 */