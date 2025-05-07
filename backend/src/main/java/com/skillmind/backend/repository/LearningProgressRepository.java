package com.skillmind.backend.repository;

import com.skillmind.backend.entity.LearningProgress;
import com.skillmind.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {
//     List<LearningProgress> findByUser(User user);
// }
public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {

    void deleteByUser(User user); // for manual deletion if needed

    List<LearningProgress> findByUser(User user);
}
