plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "b.taxp"
    compileSdk = 37

    defaultConfig {
        applicationId = "b.taxp"
        minSdk = 24
        //noinspection ExpiredTargetSdkVersion
        targetSdk = 28
        versionCode = 1
        versionName = "0.9.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    androidResources {
        // include .env
        ignoreAssetsPattern = "!.svn:!.git:!.ds_store"
    }

    // 按架构分 flavor 构建，每个 flavor 的 assets 源集只包含对应架构的 zip
    flavorDimensions += "abi"
    productFlavors {
        create("arm64") {
            dimension = "abi"
            ndk { abiFilters += "arm64-v8a" }
        }
        create("armv7") {
            dimension = "abi"
            ndk { abiFilters += "armeabi-v7a" }
        }
    }

    packaging {
        jniLibs {
            useLegacyPackaging = true
        }
    }
}

dependencies {
    implementation(libs.androidx.constraintlayout)
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity)
    implementation(libs.xz)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(libs.androidx.junit)
    compileOnly(libs.xposed.api)
}
