package com.skillmind.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillmind.backend.entity.Post;
import com.skillmind.backend.entity.User;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUser(User user);

    List<Post> findByUserInOrderByCreatedAtDesc(List<User> users);

}
