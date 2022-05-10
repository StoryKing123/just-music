use futures::executor::block_on;
use futures::FutureExt;
use std::borrow::Cow;
use unm_engine::executor::Executor;
// use mimalloc::MiMalloc;
use unm_engine_bilibili::{BilibiliEngine, ENGINE_ID as BILIBILI_ENGINE_ID};
use unm_engine_migu::ENGINE_ID as MIGU_ENGINE_ID;
use unm_engine_qq::ENGINE_ID as QQ_ENGINE_ID;
use unm_types::{Artist, Context, Song};

use unm_api_utils::executor::build_full_executor;

#[tauri::command]
pub fn my_custom_command() {
    println!("I was invoked from JS!");
}

#[tauri::command]
pub async fn get_song_url(name: String, artist: String) -> Result<String, String> {
    let executor = build_full_executor();
    let context = Context::default();
    let song = Song::builder()
        .name(name.to_string())
        // .artists(vec![Artist::builder().name("周杰伦".to_string()).build()])
        .build();

    let search_result = executor
        .search(
            &[std::borrow::Cow::Borrowed(MIGU_ENGINE_ID)],
            &song,
            &context,
        )
        .await
        .unwrap();

    let result = executor.retrieve(&search_result, &context).await.unwrap();
    Ok(result.url.into())
    // result.url.into()
    // println!("end {}", result.url);
}
