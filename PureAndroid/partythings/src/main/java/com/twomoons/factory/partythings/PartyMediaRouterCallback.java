package com.twomoons.factory.partythings;

import android.support.v7.media.MediaRouter;

import com.google.android.gms.cast.CastDevice;

/**
 * Created by JnA-PC on 3/5/2015.
 */
public class PartyMediaRouterCallback extends MediaRouter.Callback {

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
}
