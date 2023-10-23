package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.SubjectPrice;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.SubjectDetailResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.SubjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectServiceImp implements SubjectService {

    @Autowired
    private final SubjectRepository subjectRepository;

    @Autowired
    private final SubjectPriceRepository subjectPriceRepository;

    @Autowired
    private final UserPaymentRepository userPaymentRepository;

    @Autowired
    private final UserRepository userRepository;


    @Override
    public List<Subjects> getAllSubject() {
        return subjectRepository.findAll();
    }

    @Override
    public Subjects getSubjectById(Long id) {
        return subjectRepository.getSubjectsBySubjectID(id);
    }

    @Override
    public Subjects save(Subjects subjects) {
        return subjectRepository.save(subjects);
    }

    @Override
    public SubjectDetailResponse getSubjectDetail(Long userId, Long subjectId) {

        Users getUser = userRepository.getById(userId);
        Subjects getSubject = subjectRepository.getSubjectsBySubjectID(subjectId);

        SubjectPrice getSubjectPrice = subjectPriceRepository.findBySubjectAndAndStatus(getSubject, true);

        UserPayment getUserPayment = userPaymentRepository.findByUsersAndSubjectAndSubjectPriceAndStatus(getUser, getSubject, getSubjectPrice, true);
        SubjectDetailResponse dataResponse;
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String strDate= formatter.format(date);
        if(getUserPayment != null){
            dataResponse = new SubjectDetailResponse(
                    getSubject.getSubjectID(),
                    getSubject.getSubjectName(),
                    getSubject.getDescription(),
                    getSubject.getImage(),
                    formatter.format(getSubject.getCreateDate()),
                    getSubjectPrice.getPreID(),
                    getSubjectPrice.getPrice(),
                    getUserPayment.getBillID(),
                    getUserPayment.isStatus(),
                    formatter.format(getUserPayment.getPurchaseDate())

            );
        }else{
            dataResponse = new SubjectDetailResponse(
                    getSubject.getSubjectID(),
                    getSubject.getSubjectName(),
                    getSubject.getDescription(),
                    getSubject.getImage(),
                    formatter.format(getSubject.getCreateDate()),
                    getSubjectPrice.getPreID(),
                    getSubjectPrice.getPrice()
            );
        }

        return dataResponse;
    }


}
