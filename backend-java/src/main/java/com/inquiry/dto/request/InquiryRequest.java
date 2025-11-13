package com.inquiry.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InquiryRequest {

    @NotBlank(message = "제목을 입력해주세요")
    @Size(min = 2, max = 100, message = "제목은 2자 이상 100자 이하여야 합니다")
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    @Size(min = 10, message = "내용은 10자 이상이어야 합니다")
    private String content;
}
