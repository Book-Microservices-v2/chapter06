package microservices.book.gamification.game.domain;

import lombok.*;

import javax.persistence.*;

/**
 * This class links a Badge to a User. Contains also a timestamp with the moment in which the user got it.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgeCard {

    @Id
    @GeneratedValue
    private Long badgeId;

    private Long userId;
    @EqualsAndHashCode.Exclude
    private long badgeTimestamp;
    private BadgeType badgeType;

    public BadgeCard(final Long userId, final BadgeType badgeType) {
        this(null, userId, System.currentTimeMillis(), badgeType);
    }

}
