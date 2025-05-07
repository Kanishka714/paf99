package com.skillmind.backend.controller;

import com.skillmind.backend.entity.LearningProgress;
import com.skillmind.backend.entity.LearningProgressResponse;
import com.skillmind.backend.entity.User;
import com.skillmind.backend.repository.UserRepository;
import com.skillmind.backend.service.LearningProgressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/learning-progresses")
public class LearningProgressController {

    @Autowired
    private LearningProgressService progressService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public LearningProgress createProgress(@RequestBody LearningProgress progress, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        progress.setUser(user);
        return progressService.save(progress);
    }

    @GetMapping("/my")
    public List<LearningProgress> myProgresses(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return progressService.getProgressesByUser(user);
    }

    @GetMapping("/all")
    public List<LearningProgressResponse> getAllProgresses() {
        return progressService.getAllProgressesAsResponse();
    }

    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        LearningProgress progress = progressService.getProgressById(id);
        if (!progress.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this progress.");
        }
        progressService.deleteById(id);
    }
}
