package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Enum.ERole;
import com.example.onlinequiz.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
