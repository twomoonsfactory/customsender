package com.twomoons.factory.partythings;

import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookPromptSelectionPane implements IMsgHandler {
    private final Hub hub;
    private final MainActivity ctx;
    private final View ghPromptSelectionPane;
    private final TextView ghVoteForPrompt;
    private final Button ghPrompt_Button_1;
    private final Button ghPrompt_Button_2;
    private final Button ghPrompt_Button_3;

    public GetHookPromptSelectionPane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghPromptSelectionPane = ctx.getViewById(R.id.pickPlayerPane);
        this.ghVoteForPrompt = (TextView) ctx.getViewById(R.id.readyPromptText);
        this.ghPrompt_Button_1 = (Button) ctx.getViewById(R.id.prompt_button_1);
        this.ghPrompt_Button_2 = (Button) ctx.getViewById(R.id.prompt_button_2);
        this.ghPrompt_Button_3 = (Button) ctx.getViewById(R.id.prompt_button_3);
        setupListener();
    }

    private void setupListener() { hub.RegisterMsgr(this,CommunicatorEvents.EnterPickPlayerEnter); }

    public void hidePane(){
        ghPromptSelectionPane.setVisibility(View.GONE);
    }

    public void showPane() {
        ghPromptSelectionPane.setVisibility(View.VISIBLE);
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterPickPlayerEnter){
            showPane();
        }
    }
}
