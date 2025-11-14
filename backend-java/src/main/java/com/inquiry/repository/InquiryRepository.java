package com.inquiry.repository;

import com.inquiry.entity.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    @Query("SELECT i FROM Inquiry i JOIN FETCH i.author ORDER BY i.createdAt DESC")
    Page<Inquiry> findAllWithAuthor(Pageable pageable);
}
