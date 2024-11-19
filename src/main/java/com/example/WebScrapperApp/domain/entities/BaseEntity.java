package com.example.WebScrapperApp.domain.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.UUID;

@MappedSuperclass
public abstract class BaseEntity implements Serializable {
    private Long id;

    public BaseEntity() {
    }

    @Id
    @GeneratedValue(generator = "identity", strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true, insertable=false, updatable=false)
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
