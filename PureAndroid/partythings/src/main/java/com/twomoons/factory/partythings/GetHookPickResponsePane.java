package com.twomoons.factory.partythings;

import android.view.View;
import android.widget.ListView;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookPickResponsePane implements IMsgHandler {
    private final Hub hub;
    private final MainActivity ctx;
    private final View ghPickResponsePane;
    private final TextView ghPickResponseText;
    private final ListView ghPickResponseLis;

    public GetHookPickResponsePane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghPickResponsePane = ctx.getViewById(R.id.pickResponsePane);
        this.ghPickResponseText = (TextView) ctx.getViewById(R.id.pickResponseText);
        this.ghPickResponseLis = (ListView) ctx.getViewById(R.id.pickResponseList);
        setupListener();
    }

    private void setupListener() {
        hub.RegisterMsgr(this,CommunicatorEvents.EnterPickResponseEnter);
    }

    public void hidePane(){
        ghPickResponsePane.setVisibility(View.GONE);
    }

    public void showPane() {
        ghPickResponsePane.setVisibility(View.VISIBLE);
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterPickResponseEnter){
            showPane();
        }
    }
}
