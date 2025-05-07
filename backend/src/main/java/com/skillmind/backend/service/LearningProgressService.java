package com.skillmind.backend.service;

import com.skillmind.backend.entity.LearningProgress;
import com.skillmind.backend.entity.LearningProgressResponse;
import com.skillmind.backend.entity.User;
import com.skillmind.backend.repository.LearningProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningProgressService {

    @Autowired
    private LearningProgressRepository learningProgressRepository;

    public LearningProgress save(LearningProgress progress) {
        return learningProgressRepository.save(progress);
    }

    public List<LearningProgressResponse> getAllProgressesAsResponse() {
        List<LearningProgress> progresses = learningProgressRepository.findAll();

        return progresses.stream()
                .map(progress -> {
                    User user = progress.getUser(); // make sure this is not lazy/null
                    String username = (user != null) ? user.getUsername() : "Anonymous";
                    String profileImage = (user != null) ? user.getProfileImage() : null;

                    return new LearningProgressResponse(
                            progress.getId(),
                            progress.getTitle(),
                            progress.getTopics(),
                            progress.getResources(),
                            progress.getTargetDate(),
                            progress.getProgress(),
                            username,
                            profileImage
                    );
                })
                .toList();
    }

    public List<LearningProgress> getProgressesByUser(User user) {
        return learningProgressRepository.findByUser(user);
    }

    public void deleteById(Long id) {
        learningProgressRepository.deleteById(id);
    }

    public LearningProgress getProgressById(Long id) {
        return learningProgressRepository.findById(id).orElseThrow();
    }

}
