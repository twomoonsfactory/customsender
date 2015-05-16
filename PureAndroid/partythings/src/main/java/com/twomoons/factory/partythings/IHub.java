package com.twomoons.factory.partythings;

/**
 * Created by JnA-PC on 5/9/2015.
 */
public interface IHub {
    void RegisterMsgr(IMsgHandler msgr);
    void SendMessage(CommunicatorEvents messageType, String message);
}
