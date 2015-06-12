package com.twomoons.factory.partythings;

import android.content.Context;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookPickPlayerPane implements IMsgHandler{
    private final Hub hub;
    private final MainActivity ctx;
    private final View ghPickPlayerPane;
    private final TextView ghReadyPromptText;
    private final Button ghReady;

    public GetHookPickPlayerPane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghPickPlayerPane = ctx.getViewById(R.id.pickPlayerPane);
        this.ghReadyPromptText = (TextView) ctx.getViewById(R.id.readyPromptText);
        this.ghReady = (Button) ctx.getViewById(R.id.ready);
    }

    public void hidePane(){
        ghPickPlayerPane.setVisibility(View.GONE);
    }

    public void showPane() {
        ghPickPlayerPane.setVisibility(View.VISIBLE);
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.PickPlayerEnter) {
            showPane();
        }
    }
}
