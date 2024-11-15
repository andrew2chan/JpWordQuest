package com.andrew2chan.jp_word_quest.service.impl;

import com.andrew2chan.jp_word_quest.domain.Word;
import com.andrew2chan.jp_word_quest.repository.WordRepository;
import com.andrew2chan.jp_word_quest.service.WordService;
import org.springframework.stereotype.Service;

@Service
public class WordServiceImpl implements WordService {
    private final WordRepository wordRepository;

    public WordServiceImpl(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @Override
    public void save(Word word) {
        wordRepository.save(word);
    }
}
