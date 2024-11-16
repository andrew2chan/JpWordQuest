package com.andrew2chan.jp_word_quest.service.impl;

import com.andrew2chan.jp_word_quest.domain.Word;
import com.andrew2chan.jp_word_quest.repository.WordRepository;
import com.andrew2chan.jp_word_quest.service.WordService;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public List<Word> getListOfWords(String jlpt) {
        final int NUM_OF_OPTIONS = 4;
        List<Word> words = new ArrayList<>();
        Stack<Long> offsetStack = new Stack<>();
        Set<Long> savedNumbers = new HashSet<>();

        long recordsInWordDB = wordRepository.getCountBasedOnJlptLevel(jlpt);

        for(int i = 0; i < NUM_OF_OPTIONS; i++) {
            long offset;
            do { //keep repeating until we find an offset that we haven't used yet
                offset = (long) Math.floor(Math.random() * recordsInWordDB);
            } while(savedNumbers.contains(offset));
            offsetStack.push(offset);
            savedNumbers.add(offset);
        }

        while(!offsetStack.empty()) { //go through all the offsets and make a list of the elements we get based on offset, taking 1 each time
            long poppedOffset = offsetStack.pop();
            Word selectedWord = wordRepository.findWordByOffset(jlpt, poppedOffset); //filter by jlpt level so we only find words within that jlpt level
            words.add(selectedWord);
        }

        return words;
    }
}
