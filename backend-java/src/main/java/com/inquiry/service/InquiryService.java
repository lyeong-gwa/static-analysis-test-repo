package com.inquiry.service;

import com.inquiry.dto.request.InquiryRequest;
import com.inquiry.dto.response.InquiryResponse;
import com.inquiry.dto.response.PageResponse;
import com.inquiry.entity.Inquiry;
import com.inquiry.entity.User;
import com.inquiry.repository.InquiryRepository;
import com.inquiry.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<InquiryResponse> getAll(int page, int size) {
        Page<Inquiry> inquiryPage = inquiryRepository.findAllWithAuthor(
                PageRequest.of(page - 1, size));

        List<InquiryResponse> content = inquiryPage.getContent().stream()
                .map(InquiryResponse::from)
                .toList();

        return PageResponse.from(inquiryPage, content);
    }

    @Transactional(readOnly = true)
    public InquiryResponse getById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("문의글을 찾을 수 없습니다"));
        return InquiryResponse.from(inquiry);
    }

    @Transactional
    public InquiryResponse create(InquiryRequest request, Long userId) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Inquiry inquiry = Inquiry.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(author)
                .build();

        Inquiry saved = inquiryRepository.save(inquiry);
        return InquiryResponse.from(saved);
    }

    @Transactional
    public InquiryResponse update(Long id, InquiryRequest request, Long userId) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("문의글을 찾을 수 없습니다"));

        if (!inquiry.getAuthor().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다");
        }

        inquiry.setTitle(request.getTitle());
        inquiry.setContent(request.getContent());

        return InquiryResponse.from(inquiry);
    }

    @Transactional
    public void delete(Long id, Long userId) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("문의글을 찾을 수 없습니다"));

        if (!inquiry.getAuthor().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다");
        }

        inquiryRepository.delete(inquiry);
    }
}
