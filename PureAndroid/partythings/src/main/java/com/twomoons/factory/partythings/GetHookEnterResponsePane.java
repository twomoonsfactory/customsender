package com.twomoons.factory.partythings;

import android.content.Context;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by Joshua on 5/21/2015.
 */
public class GetHookEnterResponsePane implements IMsgHandler{
    private final Hub hub;
    private final MainActivity ctx;
    private final View pane;
    private final TextView responseText;
    private final TextView responsePrompt;
    private final TextView responseEdit;
    private final Button responseButton;


    public GetHookEnterResponsePane(MainActivity ctx, Hub communicationHub) {
        this.ctx = ctx;
        this.hub = communicationHub;
        this.pane = ctx.getViewById(R.id.enterResponsePane);
        this.responsePrompt = (TextView) ctx.getViewById(R.id.enterResponsePromptText);
        this.responseText = (TextView) ctx.getViewById(R.id.enterResponseText);
        this.responseEdit = (EditText) ctx.getViewById(R.id.enterResponseEdit);
        this.responseButton = (Button) ctx.getViewById(R.id.response_button);
        setupListener();
    }

    private void setupListener() {
        hub.RegisterMsgr(this,CommunicatorEvents.EnterResponseEnter);
    }

    public void hidePane(){
        pane.setVisibility(View.GONE);
    }

    public void showPane() {
        pane.setVisibility(View.VISIBLE);
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterResponseEnter) {
            responsePrompt.setText(message);
            showPane();
        }
    }
}
