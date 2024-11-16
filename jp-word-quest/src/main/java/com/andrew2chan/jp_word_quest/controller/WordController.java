package com.andrew2chan.jp_word_quest.controller;

import com.andrew2chan.jp_word_quest.domain.Word;
import com.andrew2chan.jp_word_quest.service.WordService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class WordController {
    private WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @ApiResponses(value = {
            @ApiResponse(description = "Bad Request. Enter a JLPT level starting from 0-4. For example: JLPT0.", responseCode = "400", content = @Content(examples = @ExampleObject(value = ""))),
            @ApiResponse(description = "A list of Word objects", responseCode = "200")
    })
    @GetMapping("/getOptions/{jlpt}")
    public ResponseEntity<List<Word>> getListOfOptions(@PathVariable String jlpt) {
        try { // Checks to see if the JLPT string matches an actual level that we have
            Set<String> jlptAcceptedStrings = new HashSet<>(List.of("JLPT0","JLPT1","JLPT2","JLPT3","JLPT4"));

            if(!jlptAcceptedStrings.contains(jlpt)) throw new Exception();
        }
        catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Word> words = wordService.getListOfWords(jlpt);
        return new ResponseEntity<>(words, HttpStatus.OK);
    }
}
