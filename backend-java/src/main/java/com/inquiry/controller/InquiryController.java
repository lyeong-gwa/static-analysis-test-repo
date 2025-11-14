package com.inquiry.controller;

import com.inquiry.dto.request.InquiryRequest;
import com.inquiry.dto.response.InquiryResponse;
import com.inquiry.dto.response.PageResponse;
import com.inquiry.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<PageResponse<InquiryResponse>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(inquiryService.getAll(page, limit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(inquiryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<InquiryResponse> create(
            @Valid @RequestBody InquiryRequest request,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        InquiryResponse response = inquiryService.create(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InquiryResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody InquiryRequest request,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(inquiryService.update(id, request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        inquiryService.delete(id, userId);
        return ResponseEntity.ok(Map.of("message", "문의글이 삭제되었습니다"));
    }
}
