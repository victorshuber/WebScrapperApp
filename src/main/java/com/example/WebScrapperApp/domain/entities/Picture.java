package com.example.WebScrapperApp.domain.entities;



import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pictures")
public class Picture extends BaseEntity {
    private String description;
    private UsersHib userId;
    private String imageUrl;
    private LocalDateTime time;
    private String cloudinaryPublicId;

    public Picture() {
    }

    @Column(name = "description")
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne(optional = false, targetEntity = UsersHib.class)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    public UsersHib getUserId() {
        return this.userId;
    }

    public void setUserId(UsersHib id) {
        this.userId = id;
    }

    @Column(name = "image_url", nullable = false)
    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Column(name = "cloudinary_public_id")
    public String getCloudinaryPublicId() {
        return this.cloudinaryPublicId;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }
}
