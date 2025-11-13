package com.inquiry.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> data;
    private long total;
    private int page;
    private int totalPages;

    public static <T> PageResponse<T> from(Page<?> page, List<T> content) {
        return PageResponse.<T>builder()
                .data(content)
                .total(page.getTotalElements())
                .page(page.getNumber() + 1)
                .totalPages(page.getTotalPages())
                .build();
    }
}
