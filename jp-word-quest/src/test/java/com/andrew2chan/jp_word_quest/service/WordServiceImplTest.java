package com.andrew2chan.jp_word_quest.service;

import com.andrew2chan.jp_word_quest.domain.Word;
import com.andrew2chan.jp_word_quest.repository.WordRepository;
import com.andrew2chan.jp_word_quest.service.impl.WordServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class WordServiceImplTest {
    @Mock
    private WordRepository wordRepository;

    @InjectMocks
    private WordServiceImpl wordService;

    @Test
    public void checkSaveIsCalled() {
        Word word = new Word();

        wordService.save(word);

        verify(wordRepository, times(1)).save(word);
    }
}
