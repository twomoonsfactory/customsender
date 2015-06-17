package com.twomoons.factory.partythings;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by JnA-PC on 5/10/2015.
 */
public class Hub implements IHub {
    HashMap<CommunicatorEvents,List<IMsgHandler>> Listeners;

    public Hub(){
        Listeners = new HashMap<>();
    }

    @Override
    public void RegisterMsgr(IMsgHandler msgr, CommunicatorEvents eventType) {
        if(!Listeners.containsKey(eventType)) {
            Listeners.put(eventType, new ArrayList<IMsgHandler>());
        }
        Listeners.get(eventType).add(msgr);
    }

    @Override
    public void RegisterMsgr(IMsgHandler msgr, List<CommunicatorEvents> eventType) {
        for (int i = 0; i < eventType.size(); i++) {
            RegisterMsgr(msgr, eventType.get(i));
        }
    }

    @Override
    public void SendMessage(CommunicatorEvents messageType, String message) {
        List<IMsgHandler> handlers = Listeners.get(messageType);
        if(null == handlers || handlers.size() <= 0) {
            System.out.println("ERROR: No one is listening for " + messageType.toString());
        }
        else
        {
            for (int i = 0; i < handlers.size(); i++) {
                    handlers.get(i).HandleMessage(messageType, message);
            }
        }
    }
}
