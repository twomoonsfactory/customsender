package com.twomoons.factory.partythings;

import android.view.View;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookResultsPane implements IMsgHandler{
    private final Hub hub;
    private final MainActivity ctx;
    private final View ghResultsPane;
    private final TextView ghChosenPlayerIntroText;
    private final TextView ghChosenPlayerText;
    private final TextView ghChosenResponseIntroText;
    private final TextView ghChosenResponseText;
    private final TextView ghSuccessRateIntroText;
    private final TextView ghSuccessText;

    public GetHookResultsPane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghResultsPane = ctx.getViewById(R.id.resultsPane);
        this.ghChosenPlayerIntroText = (TextView) ctx.getViewById(R.id.chosenPlayerIntroText);
        this.ghChosenPlayerText = (TextView) ctx.getViewById(R.id.chosenPlayerText);
        this.ghChosenResponseIntroText = (TextView) ctx.getViewById(R.id.chosenResponseIntroText);
        this.ghChosenResponseText = (TextView) ctx.getViewById(R.id.chosenResponseText);
        this.ghSuccessRateIntroText = (TextView) ctx.getViewById(R.id.successRateIntroText);
        this.ghSuccessText = (TextView) ctx.getViewById(R.id.successText);
        setupListener();
    }

    private void setupListener() {
        hub.RegisterMsgr(this,CommunicatorEvents.EnterResponseEnter);
    }

    public void hidePane(){
        ghResultsPane.setVisibility(View.GONE);
    }

    public void showPane() {
        ghResultsPane.setVisibility(View.VISIBLE);
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterResultsEnter){
            showPane();
        }
    }
}