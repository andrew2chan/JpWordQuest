package com.andrew2chan.jp_word_quest;

import com.andrew2chan.jp_word_quest.domain.Word;
import com.andrew2chan.jp_word_quest.repository.WordRepository;
import com.andrew2chan.jp_word_quest.service.WordService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
final class SeedData implements CommandLineRunner {
    private final WordService wordService;
    private final WordRepository wordRepository;

    private SeedData(WordService wordService, WordRepository wordRepository) {
        this.wordService = wordService;
        this.wordRepository = wordRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        File file = new File(getClass().getResource("/data/seed.json").getFile()); //get file from resource folder

        ObjectMapper mapper = new ObjectMapper();
        List<Word> words = mapper.readValue(file, mapper.getTypeFactory().constructCollectionType(List.class, Word.class)); //converts the json file into a list

        for(Word word : words) { // go through each of the words that were read in from json file
            Example<Word> example = Example.of(word); //make an example of it

            if(!wordRepository.exists(example)) wordService.save(word); //if the example doesn't exist already then add it in
        }
    }
}
