package com.andrew2chan.jp_word_quest.repository;

import com.andrew2chan.jp_word_quest.domain.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    @Query(value = "SELECT COUNT(*) FROM Word WHERE jlpt = :jlpt", nativeQuery = true)
    long getCountBasedOnJlptLevel(@Param("jlpt") String jlpt);

    @Query(value = "SELECT * FROM Word WHERE jlpt = :jlpt LIMIT 1 OFFSET :offset", nativeQuery = true)
    Word findWordByOffset(@Param("jlpt") String jlpt, @Param("offset") long offset);
}
