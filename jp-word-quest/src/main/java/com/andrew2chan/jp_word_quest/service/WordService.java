package com.andrew2chan.jp_word_quest.service;

import com.andrew2chan.jp_word_quest.domain.Word;

import java.util.List;

public interface WordService {
    public void save(Word word);
    public List<Word> getListOfWords(String jlpt);
}
