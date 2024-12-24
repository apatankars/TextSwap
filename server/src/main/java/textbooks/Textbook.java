package textbooks;

public record Textbook(
    String user_id,
    String title,
    String author,
    String edition,
    String course,
    String condition,
    String isbn,
    String start_price,
    String buy_price) {
  public Textbook {
    if (user_id == null
        || title == null
        || author == null
        || edition == null
        || course == null
        || condition == null
        || isbn == null
        || start_price == null
        || buy_price == null) {
      throw new IllegalArgumentException("All fields must be non-null");
    }
  }
}
