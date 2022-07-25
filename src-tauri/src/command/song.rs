use std::{borrow::Cow, result};

// use futures::executor::block_on;
// use futures::FutureExt;
// use serde::__private::de::Borrowed;
// use std::borrow::Cow;
// use unm_engine::executor::Executor;
// use mimalloc::MiMalloc;
// use unm_engine_bilibili::{BilibiliEngine, ENGINE_ID as BILIBILI_ENGINE_ID};
use unm_engine_migu::ENGINE_ID as MIGU_ENGINE_ID;
use unm_engine_pyncm::ENGINE_ID as NET_EAST_ENGINE_ID;
// use unm_engine_qq::ENGINE_ID as QQ_ENGINE_ID;
use unm_types::{Artist, Context, ContextBuilder, SearchMode, Song};

use unm_api_utils::executor::build_full_executor;

#[tauri::command]
pub fn my_custom_command() {
    // println!("I was invoked from JS!");
}

#[tauri::command]
pub async fn get_song_url(name: String, artist: String) -> Result<String, String> {
    let song = Song::builder()
        .name(name.to_string())
        .artists(vec![Artist::builder().name(artist.to_string()).build()])
        .build();

    let context = ContextBuilder::default()
        .enable_flac(std::env::var("ENABLE_FLAC").unwrap_or_else(|_| "".into()) == "true")
        .search_mode(match std::env::var("SEARCH_MODE") {
            Ok(v) if v == "fast_first" => SearchMode::FastFirst,
            Ok(v) if v == "order_first" => SearchMode::OrderFirst,
            _ => SearchMode::FastFirst,
        })
        .build()
        .unwrap();

    let executor = unm_api_utils::executor::build_full_executor();
    let engines_to_use = std::env::var("ENGINES")
        .unwrap_or_else(|_| executor.list().join(" "))
        .split_whitespace()
        .map(|v| Cow::Owned(v.to_string()))
        .collect::<Vec<Cow<'static, str>>>();

    let search_result = executor.search(&engines_to_use, &song, &context).await;

    // let (search_time_taken, search_result) =
    //     measure_async_function_time(|| executor.search(&engines_to_use, &song, &context).boxed())
    //         .await;
    // let search_result = search_result.expect("should has a search result");
    let retrieved_result = executor.retrieve(&search_result.unwrap(), &context).await;

    // let (retrieve_time_taken, retrieved_result) =
    // measure_async_function_time(|| executor.retrieve(&search_result, &context).boxed()).await;
    let retrieved_result = retrieved_result.expect("can't be retrieved");

    println!(
        "[Retrieved] {} - {}: {} (from {})",
        artist, name, retrieved_result.url, retrieved_result.source
    );
    Ok(retrieved_result.url)
    // match search_result {
    //     Ok(_) => {
    //         let result = search_result.unwrap();
    //         let result = executor.retrieve(&result, &context).await.unwrap();
    //         println!("{:?}", result.source);
    //         return Ok(result.url.into());
    //     }
    //     Err(_e) => return Ok(String::from("")),
    // }
    // let executor = build_full_executor();
    // let context = Context::default();
    // let song = Song::builder()
    //     .name(name.to_string())
    //     .artists(vec![Artist::builder().name(artist.to_string()).build()])
    //     .build();
    // println!("name:{},artist:{}", name, artist);

    // let search_result = executor
    //     .search(
    //         &[
    //             std::borrow::Cow::Borrowed(MIGU_ENGINE_ID),
    //             std::borrow::Cow::Borrowed(NET_EAST_ENGINE_ID),
    //         ],
    //         &song,
    //         &context,
    //     )
    //     .await;
    // match search_result {
    //     Ok(result) => {
    //         let result = executor.retrieve(&result, &context).await.unwrap();
    //         println!("{:?}", result.source);
    //         return Ok(result.url.into());
    //     }
    //     Err(_e) => return Ok(String::from("")),
    // }
    // let search_result = executor
    //     .search(
    //         &[
    //             // std::borrow::Cow::Borrowed(MIGU_ENGINE_ID),
    //             std::borrow::Cow::Borrowed(NET_EAST_ENGINE_ID),
    //         ],
    //         &song,
    //         &context,
    //     )
    //     .await
    // .unwrap();

    // let result = executor.retrieve(&search_result, &context).await.unwrap();
    // Ok(result.url.into())
    // result.url.into()
    // println!("end {}", result.url);
}
