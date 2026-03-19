package com.br.caio.ben10.entities;

import java.util.ArrayList;
import java.util.List;

import com.br.caio.ben10.entities.enums.CategoryCharacter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_characters")
public class Characters {
  
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String description;
    private String age;
    private CategoryCharacter category;
    List<String> powers = new ArrayList<>();
    List<String> apparences = new ArrayList<>();
    
}
