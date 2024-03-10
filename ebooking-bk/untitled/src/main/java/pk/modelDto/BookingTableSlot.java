package pk.modelDto;

import java.util.List;

public class BookingTableSlot {
    String articleKey;
    String slotKey;
    String slotValue;
    String info;
    List<Integer> userPins;

    Integer priority;

    public String getArticleKey() {
        return articleKey;
    }

    public void setArticleKey(String articleKey) {
        this.articleKey = articleKey;
    }

    public String getSlotKey() {
        return slotKey;
    }

    public void setSlotKey(String slotKey) {
        this.slotKey = slotKey;
    }

    public String getSlotValue() {
        return slotValue;
    }

    public void setSlotValue(String slotValue) {
        this.slotValue = slotValue;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public List<Integer> getUserPins() {
        return userPins;
    }

    public void setUserPins(List<Integer> userPins) {
        this.userPins = userPins;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }
}
