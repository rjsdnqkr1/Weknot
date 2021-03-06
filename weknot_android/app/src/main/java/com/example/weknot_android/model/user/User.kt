package com.example.weknot_android.model.user

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_table")
data class User(@field:PrimaryKey
                var id: String,
                var name: String?,
                var birth: String?,
                var gender: String?,
                var phoneNumber: String?,
                var photo: String?,
                var intro: String?,
                var scope: String?,
                var point: Int)
