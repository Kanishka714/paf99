package com.skillmind.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillmind.backend.entity.LearningPlan;
import com.skillmind.backend.entity.LearningPlanResponse;
import com.skillmind.backend.entity.User;
import com.skillmind.backend.repository.UserRepository;
import com.skillmind.backend.service.LearningPlanService;


@RestController
@RequestMapping("/api/learning-plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService planService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public LearningPlan createPlan(@RequestBody LearningPlan plan, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        plan.setUser(user);
        return planService.save(plan);
    }

    // Get all plans
    @GetMapping("/my")
    public List<LearningPlan> myPlans(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return planService.getPlansByUser(user);
    }

    public List<LearningPlanResponse> getAllPlans() {
        return planService.getAllPlansAsResponse();
    }

    // Get a specific plan by ID
    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        LearningPlan plan = planService.getPlanById(id);
        if (!plan.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this plan.");
        }
        planService.deleteById(id);
    }
}
