package com.twomoons.factory.partythings;

import java.util.List;

/**
 * Created by JnA-PC on 5/9/2015.
 */
public interface IHub {
    void RegisterMsgr(IMsgHandler msgr, CommunicatorEvents eventType);
    void RegisterMsgr(IMsgHandler msgr, List<CommunicatorEvents> eventType);
    void SendMessage(CommunicatorEvents messageType, String message);
}
