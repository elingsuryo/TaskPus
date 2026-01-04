package controller

import (
	"TaskPus/database"
	"TaskPus/helpers"
	"TaskPus/model"
	"TaskPus/structs"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func GetLpd(c *gin.Context) {
	var lpd []model.Lpd
	var response []structs.LpdResponse

	if err := database.DB.Find(&lpd).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to fetch surat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	for _, u := range lpd {
		var petugasResp []structs.PegawaiResponse
		for _, p := range u.Surat.Petugas {
			petugasResp = append(petugasResp, structs.PegawaiResponse{
				Id:   p.Id,
				Nama: p.Nama,
			})
		}
		r := structs.LpdResponse{
			Id:            u.Id,
			SuratId:       u.SuratId,
			HasilKegiatan: u.HasilKegiatan,
			Dokumentasi:   u.Dokumentasi,
			PetugasId:     u.PetugasId,

			Surat: structs.SuratResponse{
				Id:              u.Surat.Id,
				NomorSurat:      u.Surat.NomorSurat,
				Status:          u.Surat.Status,
				TanggalBuat:     u.Surat.TanggalBuat,
				Lama:            u.Surat.Lama,
				Petugas:         petugasResp,
				TanggalMulai:    u.Surat.TanggalMulai,
				TanggalSelesai:  u.Surat.TanggalSelesai,
				KepalaPuskesmas: u.Surat.KepalaPuskesmas,
				JumlahPetugas:   u.Surat.JumlahPetugas,
				JenisPerjadin:   u.Surat.JenisPerjadin,
				DalamRangkaId:   u.Surat.DalamRangkaId,
				AtasNama:        u.Surat.AtasNama,
				TempatId:        u.Surat.TempatId,
			},
		}
		response = append(response, r)
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data lpd",
		Data:    response,
	})
}

func CreateLpd(c *gin.Context) {

	var req structs.CreateLpdRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validasi gagal",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// ---- ambil file dokumentasi ----
	file, err := c.FormFile("dokumentasi")
	var filePath string

	if err == nil {
		filePath = "uploads/lpd/" + file.Filename
		_ = c.SaveUploadedFile(file, filePath)
	}

	// ---- pastikan surat ada ----
	var surat model.Surat
	if err := database.DB.First(&surat, req.SuratId).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Surat tidak ditemukan",
		})
		return
	}

	// ---- buat data LPD ----
	lpd := model.Lpd{
		SuratId:       req.SuratId,
		HasilKegiatan: req.HasilKegiatan,
		Dokumentasi:   filePath,
		PetugasId:     req.PetugasId,
	}

	if err := database.DB.Create(&lpd).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal membuat LPD",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// ---- update status surat otomatis ----
	if surat.Status == "" || surat.Status == "draft" || surat.Status == "belum" {
		surat.Status = "selesai" // <-- ubah sesuai kebutuhanmu
		database.DB.Save(&surat)
	}

	// ---- response ----
	res := structs.LpdResponse{
		Id:            lpd.Id,
		SuratId:       lpd.SuratId,
		HasilKegiatan: lpd.HasilKegiatan,
		Dokumentasi:   lpd.Dokumentasi,
		PetugasId:     lpd.PetugasId,
	}

	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "LPD berhasil dibuat",
		Data:    res,
	})
}

func GetLpdById(c *gin.Context) {
	id := c.Param("id")
	var lpd model.Lpd

	if err := database.DB.First(&lpd, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Lpd not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	var response []structs.LpdResponse
	var petugasResp []structs.PegawaiResponse
	for _, p := range lpd.Surat.Petugas {
		petugasResp = append(petugasResp, structs.PegawaiResponse{
			Id:   p.Id,
			Nama: p.Nama,
		})
	}
	response = append(response, structs.LpdResponse{
		Id:            lpd.Id,
		SuratId:       lpd.SuratId,
		HasilKegiatan: lpd.HasilKegiatan,
		Dokumentasi:   lpd.Dokumentasi,
		PetugasId:     lpd.PetugasId,
		Surat: structs.SuratResponse{
			Id:              lpd.Surat.Id,
			NomorSurat:      lpd.Surat.NomorSurat,
			Status:          lpd.Surat.Status,
			TanggalBuat:     lpd.Surat.TanggalBuat,
			Lama:            lpd.Surat.Lama,
			Petugas:         petugasResp,
			TanggalMulai:    lpd.Surat.TanggalMulai,
			TanggalSelesai:  lpd.Surat.TanggalSelesai,
			KepalaPuskesmas: lpd.Surat.KepalaPuskesmas,
			JumlahPetugas:   lpd.Surat.JumlahPetugas,
			JenisPerjadin:   lpd.Surat.JenisPerjadin,
			DalamRangkaId:   lpd.Surat.DalamRangkaId,
			AtasNama:        lpd.Surat.AtasNama,
			TempatId:        lpd.Surat.TempatId,
		},
	})

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data lpd",
		Data:    response,
	})
}

func UpdateLpd(c *gin.Context) {
	id := c.Param("id")

	var lpd model.Lpd
	if err := database.DB.Preload("Surat").First(&lpd, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "LPD tidak ditemukan",
		})
		return
	}

	var req structs.UpdateLpdRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validasi gagal",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// ---- cek jika ada file baru ----
	file, err := c.FormFile("dokumentasi")
	if err == nil {
		// buat folder
		os.MkdirAll("uploads/lpd", os.ModePerm)

		// path simpan
		filePath := "uploads/lpd/" + file.Filename

		// simpan file
		if err := c.SaveUploadedFile(file, filePath); err == nil {
			lpd.Dokumentasi = filePath
		}
	}

	// ---- update data ----
	lpd.HasilKegiatan = req.HasilKegiatan
	lpd.PetugasId = req.PetugasId

	// ---- simpan ----
	if err := database.DB.Save(&lpd).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal update LPD",
		})
		return
	}

	// ---- response ----
	var petugasResp []structs.PegawaiResponse
	for _, p := range lpd.Surat.Petugas {
		petugasResp = append(petugasResp, structs.PegawaiResponse{
			Id:   p.Id,
			Nama: p.Nama,
		})
	}

	res := structs.LpdResponse{
		Id:            lpd.Id,
		SuratId:       lpd.SuratId,
		HasilKegiatan: lpd.HasilKegiatan,
		Dokumentasi:   lpd.Dokumentasi,
		PetugasId:     lpd.PetugasId,
		Surat: structs.SuratResponse{
			Id:              lpd.Surat.Id,
			NomorSurat:      lpd.Surat.NomorSurat,
			Status:          lpd.Surat.Status,
			TanggalBuat:     lpd.Surat.TanggalBuat,
			Lama:            lpd.Surat.Lama,
			TanggalMulai:    lpd.Surat.TanggalMulai,
			TanggalSelesai:  lpd.Surat.TanggalSelesai,
			KepalaPuskesmas: lpd.Surat.KepalaPuskesmas,
			JumlahPetugas:   lpd.Surat.JumlahPetugas,
			JenisPerjadin:   lpd.Surat.JenisPerjadin,
			DalamRangkaId:   lpd.Surat.DalamRangkaId,
			AtasNama:        lpd.Surat.AtasNama,
			TempatId:        lpd.Surat.TempatId,
			Petugas:         petugasResp,
		},
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "LPD berhasil diperbarui",
		Data:    res,
	})
}

func DeleteLpd(c *gin.Context) {
	id := c.Param("id")
	role := c.GetString("role")
	if role != "admin" {
		c.JSON(http.StatusForbidden, structs.ErrorResponse{
			Success: false,
			Message: "Anda tidak memiliki izin menghapus surat",
		})
		return
	}

	var lpd model.Lpd
	if err := database.DB.First(&lpd, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "LPD tidak ditemukan",
		})
		return
	}

	// 🔗 Hapus relasi mahasiswa terlebih dahulu
	if err := database.DB.
		Model(&lpd).
		Association("Surat").
		Clear(); err != nil {

		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal menghapus relasi Surat",
		})
		return
	}

	// ❌ Hapus kelas
	if err := database.DB.Delete(&lpd).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal menghapus LPD",
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "LPD berhasil dihapus",
	})
}
