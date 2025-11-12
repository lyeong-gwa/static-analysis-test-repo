package com.inquiry.dto.response;

import com.inquiry.entity.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class InquiryResponse {
    private Long id;
    private String title;
    private String content;
    private UserResponse author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static InquiryResponse from(Inquiry inquiry) {
        return InquiryResponse.builder()
                .id(inquiry.getId())
                .title(inquiry.getTitle())
                .content(inquiry.getContent())
                .author(UserResponse.from(inquiry.getAuthor()))
                .createdAt(inquiry.getCreatedAt())
                .updatedAt(inquiry.getUpdatedAt())
                .build();
    }
}
