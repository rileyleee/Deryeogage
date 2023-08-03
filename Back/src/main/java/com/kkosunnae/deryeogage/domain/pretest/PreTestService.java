package com.kkosunnae.deryeogage.domain.pretest;

import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PreTestService {

    private final PreTestRepository preTestRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PreTestDto getPretest(Long userId) {
        PreTestEntity pretest = preTestRepository.findByUserId(userId)
                .orElseThrow(()-> new NoSuchElementException("사전 테스트 결과 정보가 존재하지 않습니다."));
        return pretest.toDto();
    }

    public int save(PreTestDto pretestDto) {
        PreTestEntity pretest = preTestRepository.save(pretestDto.toEntity(userRepository));
        return pretest.getId();
    }

    public void deleteByUserId(Long userId) {
        preTestRepository.deleteByUserId(userId);
    }
}
