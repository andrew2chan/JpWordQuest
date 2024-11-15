package com.andrew2chan.jp_word_quest.repository;

import com.andrew2chan.jp_word_quest.domain.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}
