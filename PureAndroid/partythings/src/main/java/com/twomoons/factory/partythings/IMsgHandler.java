package com.twomoons.factory.partythings;

import java.util.List;

/**
 * Created by JnA-PC on 5/9/2015.
 */
public interface IMsgHandler {
    void HandleMessage(CommunicatorEvents eventType, String message);
}
