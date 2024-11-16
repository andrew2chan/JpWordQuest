package com.andrew2chan.jp_word_quest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@Table(name = "word")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;
    private String vocab;
    private String jlpt;
    private String furigana;

    public Word() {
    }

    @Override
    public String toString() {
        return "Word{" +
                "id=" + id +
                ", word='" + word + '\'' +
                ", vocab='" + vocab + '\'' +
                ", jlpt='" + jlpt + '\'' +
                ", furigana='" + furigana + '\'' +
                '}';
    }
}
