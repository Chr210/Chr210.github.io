// 画像モーダル表示/非表示の共通JS
// imgタグまたはa.zoom内imgをクリックで拡大表示、×で閉じる

document.addEventListener('DOMContentLoaded', function() {
  // 画像クリックでモーダル表示
  function setupModalImages() {
    // profile.html: 単体img
    var profileImg = document.querySelector('img[alt*="プロフィール写真"]');
    if (profileImg) {
      profileImg.style.cursor = 'pointer';
      profileImg.addEventListener('click', function() {
        showModal(profileImg.src);
      });
    }
    // photo.html: a.zoom内img
    var zoomImgs = document.querySelectorAll('a.zoom img');
    zoomImgs.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        // 作品名取得（alt属性 or 近くのテキスト）
        var title = '';
        if (img.alt && img.alt !== 'Coyote') {
          title = img.alt;
        } else {
          // 画像の親要素の次兄弟にテキストがあれば取得
          var parent = img.parentElement.parentElement;
          var next = parent.nextElementSibling;
          if (next && next.textContent) {
            title = next.textContent.trim();
          }
        }
        showModal(img.src, title);
      });
    });
    // volunteer.html: volunteer画像はタイトル非表示
    var volunteerImgs = document.querySelectorAll('#gallery_volunteer img');
    volunteerImgs.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(img.src, ''); // タイトル空文字
      });
    });
  }

  // モーダル表示
  function showModal(src, title) {
    var modal = document.getElementById('img-modal');
    var modalImg = document.getElementById('img-modal-img');
    var modalTitle = document.getElementById('img-modal-title');
    modalImg.src = src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (modalTitle) {
      modalTitle.textContent = title || '';
      modalTitle.style.display = title ? 'block' : 'none';
    }
  }

  // モーダル閉じる
  function closeModal() {
    var modal = document.getElementById('img-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // ×ボタンで閉じる
  var closeBtn = document.querySelector('.img-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  // モーダル背景クリックで閉じる
  var modal = document.getElementById('img-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  setupModalImages();
});
