package com.example.weknot_android.network.api

import com.example.weknot_android.model.entity.feed.Feed
import com.example.weknot_android.network.response.Response
import io.reactivex.Single
import okhttp3.MultipartBody.Part
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Multipart
import retrofit2.http.POST

interface FeedApi {

    @Multipart
    @POST("/feeds")
    fun postFeed(@Header("Authorization") token: String,
                  @retrofit2.http.Part picture: Part,
                  @retrofit2.http.Part("comment") name: RequestBody): Single<retrofit2.Response<Response<Any>>>

    @GET("/feeds")
    fun getFeeds(@Header("Authorization") token: String): Single<retrofit2.Response<Response<List<Feed>>>>
}