package com.twomoons.factory.partythings;

import android.content.Context;
import android.support.v7.media.MediaRouter;
import android.util.Log;
import android.view.Menu;

import com.google.android.gms.cast.CastDevice;
import com.google.sample.castcompanionlibrary.cast.DataCastManager;
import com.google.sample.castcompanionlibrary.cast.callbacks.DataCastConsumerImpl;
import com.google.sample.castcompanionlibrary.cast.exceptions.NoConnectionException;
import com.google.sample.castcompanionlibrary.cast.exceptions.TransientNetworkDisconnectionException;

import java.io.IOException;
import java.util.List;

/**
 * Created by JnA-PC on 4/30/2015.
 */
public class CastService extends MediaRouter.Callback implements ICommunicator, IMsgHandler {

    private DataCastManager mCaster;
    private String mNamespace = "urn:x-cast:com.pt.basic";

    @Override
    public void Initialize(Context ctx) {
        mCaster = DataCastManager.initialize(ctx, "285A9A14", mNamespace);
        //mCaster.enableFeatures(DataCastManager.FEATURE_WIFI_RECONNECT);
        mCaster.addDataCastConsumer(new CastMessageConsumer());
    }

    @Override
    public void InitializeMenu(Menu menu, int media_route_menu_item) {
        mCaster.addMediaRouterButton(menu, media_route_menu_item);
    }

    @Override
    public void OnResume() {
        mCaster.incrementUiCounter();
    }

    @Override
    public void OnPause() {
        mCaster.decrementUiCounter();
    }

    private CastDevice mSelectedDevice;

    @Override
    public void onRouteSelected(MediaRouter router, MediaRouter.RouteInfo info) {
        mSelectedDevice = CastDevice.getFromBundle(info.getExtras());
        String routeId = info.getId();
    }

    @Override
    public void onRouteUnselected(MediaRouter router, MediaRouter.RouteInfo info) {
        //teardown();
        mSelectedDevice = null;
    }

    private void SendMessage() {
        try{
            mCaster.sendDataMessage("Marco", mNamespace);
        } catch(IOException ex){
            Log.e("MESSAGE_FAILED_IO", "Failed to send message: " + ex);
        } catch(TransientNetworkDisconnectionException ex) {
            Log.e("MESSAGE_FAILED_NET", "Failed to send message: " + ex);
        } catch(NoConnectionException ex) {
            Log.e("MESSAGE_FAILED_CONN", "Failed to send message: " + ex);
        }
    }

    @Override
    public List<CommunicatorEvents> GetHandledTypes() {
        return null;
    }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {

    }

    private class CastMessageConsumer extends DataCastConsumerImpl {
        @Override
        public void onMessageReceived(CastDevice castDevice, String namespace, String message) {

        }
    }
}


