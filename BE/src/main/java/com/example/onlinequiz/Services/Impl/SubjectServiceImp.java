package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Response.SubjectDetailResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.SubjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    @Autowired
    private final SubjectTeacherRepository subjectTeacherRepository;

    @Override
    public List<Subjects> getAllSubject() {
        return subjectRepository.findAll();
    }

//    @Override
//    public List<Subjects> getExpertSubject(Long userId) {
//        return subjectRepository.;
//    }

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

        if(getUser == null){
            return null;
        }
        SubjectPrice getSubjectPrice = subjectPriceRepository.findBySubjectAndAndStatus(getSubject, true);
        if(getSubjectPrice == null){
            return null;
        }
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
                    getSubjectPrice != null ? getSubjectPrice.getPreID() : 0,
                    getSubjectPrice != null ? getSubjectPrice.getPrice() : 0,
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
                    getSubjectPrice != null ? getSubjectPrice.getPreID() : 0,
                    getSubjectPrice != null ? getSubjectPrice.getPrice() : 0
            );
        }

        return dataResponse;
    }

    @Override
    public Long countAllSubject() {
        return subjectRepository.count();
    }

    @Override
    public List<Subjects> getSubjectByExpert(Long userId) {
        Users user = userRepository.getById(userId);
        List<SubjectTeachers> teachersList = subjectTeacherRepository.findAllByExpert(user);
        List<Long> subjectOwnId = new ArrayList<>();

        for (SubjectTeachers subjectTeacher: teachersList
             ) {
            subjectOwnId.add(subjectTeacher.getSubject().getSubjectID());

        }
        List<Subjects> subjectsList = subjectRepository.findAllBySubjectIDInAndStatusIsTrue(subjectOwnId) ;

        return subjectsList;
    }


}
