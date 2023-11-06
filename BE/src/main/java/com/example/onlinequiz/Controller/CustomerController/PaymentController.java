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
import java.io.UnsupportedEncodingException;
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

    @GetMapping("/get/price/{subjectId}")
    public ResponseEntity<CourseCheckoutResponse> getPriceSubject(
            @PathVariable Long subjectId

    ){
        try {
            CourseCheckoutResponse response = userPaymentService.getCourseCheckout(subjectId);
            if(response != null){
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


    ){
        try {
            UserPayment u = userPaymentService.addNewPayment(userId, subjectId, preId);
            PaymentResponse paymentResponse = userPaymentService.createNewVnPayPayment(u.getSubjectPrice().getPrice());


            if(paymentResponse != null){
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
vnp_PayDate=20231009165726&
vnp_ResponseCode=00&
vnp_TmnCode=QJZS3R8U&vnp_TransactionNo=14136862&
vnp_TransactionStatus=00&vnp_TxnRef=79865267&
vnp_SecureHash=c24637967a30ef03d71e095e31e4d111fb2dc504e1cbff6e8c812196f117dd18899b871cb40dfbe5006672b2aa1700cde35d34d33276d707f27c057fafb6f0b2
 */