package com.twomoons.factory.partythings;

import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookReadyPane implements IMsgHandler {
    private final Hub hub;
    private final MainActivity ctx;
    private final View ghReadyPane;
    private final TextView ghReadyPromptText;
    private final Button ghReady;

    public GetHookReadyPane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghReadyPane = ctx.getViewById(R.id.readyPane);
        this.ghReadyPromptText = (TextView) ctx.getViewById(R.id.readyPromptText);
        this.ghReady = (Button) ctx.getViewById(R.id.ready);
        setupListener();
    }

    private void setupListener() {
        hub.RegisterMsgr(this,CommunicatorEvents.EnterReadyEnter);
    }

    public void hidePane(){
        ghReadyPane.setVisibility(View.GONE);
    }

    public void showPane() {
        ghReadyPane.setVisibility(View.VISIBLE);
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterReadyEnter){
            showPane();
        }
    }
}
