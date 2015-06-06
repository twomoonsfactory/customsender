package com.twomoons.factory.partythings;

import android.content.Context;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookEnterGamePane implements IMsgHandler{
    private final Hub hub;
    private final MainActivity ctx;
    private final View ghEnterGamePane;
    private final TextView ghCreateGameText;
    private final TextView ghEnterPlayerNameText;
    private final EditText ghEditText2;
    private final Button ghCreateGameButton;


    public GetHookEnterGamePane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghEnterGamePane = ctx.getViewById(R.id.enterGamePane);
        this.ghCreateGameText = (TextView) ctx.getViewById(R.id.createGameText);
        this.ghEnterPlayerNameText = (TextView) ctx.getViewById(R.id.enterPlayerNameText);
        this.ghEditText2 = (EditText) ctx.getViewById(R.id.editText2);
        this.ghCreateGameButton = (Button) ctx.getViewById(R.id.createGameButton);
        setupListener();
    }

    private void setupListener() { hub.RegisterMsgr(this,CommunicatorEvents.EnterGameEnter); }

    public void hidePane(){
        ghEnterGamePane.setVisibility(View.GONE);
    }

    public void showPane() { ghEnterGamePane.setVisibility(View.VISIBLE); }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterGameEnter) {
            showPane();
        }
    }
}
