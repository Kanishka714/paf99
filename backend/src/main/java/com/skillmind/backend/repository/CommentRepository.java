package com.skillmind.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillmind.backend.entity.Comment;
import com.skillmind.backend.entity.Post;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPost(Post post);
}
